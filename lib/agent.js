"use strict";

const crypto = require("crypto");
const OpenAI = require("openai");
const { validateDefinitionBundle } = require("./schema.js");

const WORKFLOW_LEADER_INTERVIEW = "WORKFLOW_2_LEADER_INTERVIEW_PROCESS";

/** Minimal BPMN template — agent fills labels / flows; kept valid XML */
function buildStubLeaderInterviewBundle() {
   const processId = crypto.randomUUID();
   const childTrigger = crypto.randomUUID();
   const childEmailSchedule = crypto.randomUUID();
   const childEmailOutcome = crypto.randomUUID();
   const childEnd = crypto.randomUUID();

   const xmlDefinition =
      `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="process-def-${processId}" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="true">
    <bpmn2:startEvent id="StartEvent_LI" name="Leader interview requested"><bpmn2:outgoing>Flow_s1</bpmn2:outgoing></bpmn2:startEvent>
    <bpmn2:sequenceFlow id="Flow_s1" sourceRef="StartEvent_LI" targetRef="Email_Schedule" />
    <bpmn2:sendTask id="Email_Schedule" name="Notify schedule"><bpmn2:incoming>Flow_s1</bpmn2:incoming><bpmn2:outgoing>Flow_s2</bpmn2:outgoing></bpmn2:sendTask>
    <bpmn2:sequenceFlow id="Flow_s2" sourceRef="Email_Schedule" targetRef="Email_Outcome" />
    <bpmn2:sendTask id="Email_Outcome" name="Outcome email"><bpmn2:incoming>Flow_s2</bpmn2:incoming><bpmn2:outgoing>Flow_s3</bpmn2:outgoing></bpmn2:sendTask>
    <bpmn2:sequenceFlow id="Flow_s3" sourceRef="Email_Outcome" targetRef="End_Complete" />
    <bpmn2:endEvent id="End_Complete" name="Done"><bpmn2:incoming>Flow_s3</bpmn2:incoming><bpmn2:terminateEventDefinition /></bpmn2:endEvent>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1" /></bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

   const bundle = {
      process: {
         id: processId,
         name: "Leader Interview Process",
         type: "process",
         json: {
            id: processId,
            name: "Leader Interview Process",
            translations: [{ language_code: "en", label: "Leader Interview Process" }],
            xmlDefinition,
            elementIDs: [childTrigger, childEmailSchedule, childEmailOutcome, childEnd],
            connections: {
               Flow_s1: { id: "Flow_s1", type: "bpmn:SequenceFlow", from: "StartEvent_LI", to: "Email_Schedule" },
               Flow_s2: { id: "Flow_s2", type: "bpmn:SequenceFlow", from: "Email_Schedule", to: "Email_Outcome" },
               Flow_s3: { id: "Flow_s3", type: "bpmn:SequenceFlow", from: "Email_Outcome", to: "End_Complete" },
            },
         },
      },
      children: [
         {
            id: childTrigger,
            name: "start",
            type: "trigger",
            json: {
               id: childTrigger,
               name: "start",
               type: "trigger",
               processID: processId,
               diagramID: "StartEvent_LI",
               translations: [{ language_code: "en", label: "start" }],
               key: "TriggerLifecycle",
               triggerKey: "placeholder.object.added",
               objectID: "00000000-0000-0000-0000-000000000001",
               lifecycleKey: "added",
               laneDiagramID: "?laneID?",
            },
         },
         {
            id: childEmailSchedule,
            name: "Notify schedule",
            type: "process.task.email",
            json: {
               id: childEmailSchedule,
               name: "Notify schedule",
               type: "process.task.email",
               processID: processId,
               diagramID: "Email_Schedule",
               translations: [{ language_code: "en", label: "Notify schedule" }],
               key: "Email",
               to: "2",
               from: "2",
               subject: "Leader interview scheduled",
               message: "<p>Your leader interview has been scheduled.</p>",
               toCustom: "",
               fromCustom: "",
               toUsers: { useRole: 0, role: null, useAccount: 0, account: null },
               fromUsers: { useRole: 0, role: null, useAccount: 0, account: null },
               laneDiagramID: "?laneID?",
            },
         },
         {
            id: childEmailOutcome,
            name: "Outcome email",
            type: "process.task.email",
            json: {
               id: childEmailOutcome,
               name: "Outcome email",
               type: "process.task.email",
               processID: processId,
               diagramID: "Email_Outcome",
               translations: [{ language_code: "en", label: "Outcome email" }],
               key: "Email",
               to: "2",
               from: "2",
               subject: "Interview outcome",
               message: "<p>Outcome notification (extend BPMN to branch approve/deny).</p>",
               toCustom: "",
               fromCustom: "",
               toUsers: { useRole: 0, role: null, useAccount: 0, account: null },
               fromUsers: { useRole: 0, role: null, useAccount: 0, account: null },
               laneDiagramID: "?laneID?",
            },
         },
         {
            id: childEnd,
            name: "End",
            type: "process.task.end",
            json: {
               id: childEnd,
               name: "End",
               type: "process.task.end",
               processID: processId,
               diagramID: "End_Complete",
               translations: [{ language_code: "en", label: "End" }],
               key: "End",
               laneDiagramID: null,
            },
         },
      ],
   };

   const v = validateDefinitionBundle(bundle);
   if (!v.ok) {
      throw new Error(`Stub bundle invalid: ${v.errors.join("; ")}`);
   }
   return bundle;
}

/**
 * Generate WORKFLOW 2 — Leader Interview Process bundle (BPMN + task rows).
 * Uses OpenAI when OPENAI_API_KEY is set; otherwise deterministic stub.
 */
async function generateLeaderInterviewBundle() {
   const apiKey = process.env.OPENAI_API_KEY;
   if (!apiKey) {
      return { workflowKey: WORKFLOW_LEADER_INTERVIEW, mode: "stub", bundle: buildStubLeaderInterviewBundle() };
   }

   const client = new OpenAI({ apiKey });
   const system = `You output JSON only for AppBuilder process definitions.
Build a DefinitionBundle for WORKFLOW 2: LEADER INTERVIEW PROCESS — states for scheduling, conducting, decision (approve/deny), and email notifications at transitions.
The process row type must be "process" with json.xmlDefinition as BPMN 2.0 XML (escaped line breaks as \\n in the JSON string).
Include elementIDs array of UUIDs and a children array with one row per elementID: triggers, process.task.email for notifications, process.task.end for end events.
Each child json must include processID (parent process uuid), diagramID matching BPMN element id in xmlDefinition, and type-specific fields per DEFINITION_SCHEMA.md.
Ensure elementIDs.length === children.length and every element id appears exactly once in children[].id.`;

   const user = `Return a JSON object: { "bundle": { "process": {...}, "children": [...] } } matching the schema. Use realistic email copy for leader/staff.`;

   const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
         { role: "system", content: system },
         { role: "user", content: user },
      ],
   });

   const raw = completion.choices[0]?.message?.content;
   if (!raw) {
      throw new Error("OpenAI returned empty content");
   }
   const parsed = JSON.parse(raw);
   const bundle = parsed.bundle ?? parsed;
   const v = validateDefinitionBundle(bundle);
   if (!v.ok) {
      throw new Error(`Model returned invalid bundle: ${v.errors.join("; ")}`);
   }
   return { workflowKey: WORKFLOW_LEADER_INTERVIEW, mode: "openai", bundle: v.data };
}

module.exports = {
   WORKFLOW_LEADER_INTERVIEW,
   generateLeaderInterviewBundle,
   buildStubLeaderInterviewBundle,
};
