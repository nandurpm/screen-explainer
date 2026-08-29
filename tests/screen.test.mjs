/*
 * ============================================================
 * FILE: screen.test.mjs
 * PURPOSE: Exercises Explain This Screenshot's domain behavior, validation, persistence, reporting, and safety boundaries with the Node.js test runner.
 * ============================================================
 */

import assert from "node:assert/strict";import test from "node:test";import { runExternalAnalysis,extractLocalText } from "../src/adapters.mjs";import { demoProject } from "../src/demo.mjs";import { addAnnotation,createProject,normalizeRect,scaleRect,serializeProject,validateProject } from "../src/model.mjs";import { reportHtml } from "../src/report.mjs";
test('serializes and validates local annotation projects',()=>{let project=createProject({image:{name:'x',width:100,height:50,dataUrl:'data:image/png;base64,AA=='}});project=addAnnotation(project,{label:'Button',notes:'Manual note',rect:{x:.1,y:.2,width:.3,height:.4}});const restored=validateProject(JSON.parse(serializeProject(project)));assert.equal(restored.annotations[0].label,'Button')});
test('normalizes and scales image transforms consistently',()=>{const rect=normalizeRect({x:10,y:20,width:40,height:30},100,100);assert.deepEqual(rect,{x:.1,y:.2,width:.4,height:.3});assert.deepEqual(scaleRect(rect,100,100),{x:10,y:20,width:40,height:30})});
test('rejects malformed local projects',()=>{assert.throws(()=>validateProject({schemaVersion:9,annotations:[]}),/Unsupported/);assert.throws(()=>addAnnotation(createProject(),{label:'',rect:{x:0,y:0,width:.1,height:.1}}),/label/)});
test('handles unsupported local OCR and external adapter failure safely',async()=>{const local=await extractLocalText({});assert.equal(local.ok,false);await assert.rejects(()=>runExternalAnalysis({endpoint:'https://example.test',project:demoProject,confirmed:false,fetchImpl:async()=>({ok:true,json:async()=>({})})}),/explicit privacy/);await assert.rejects(()=>runExternalAnalysis({endpoint:'https://example.test',project:demoProject,confirmed:true,fetchImpl:async()=>{throw Error('offline')}}),/did not complete/)});
test('report includes local viewer, exports, structured explanation, and explicit external upload consent',()=>{const html=reportHtml(demoProject);assert.match(html,/Run local text extraction/);assert.match(html,/Export selected crop/);assert.match(html,/Structured explanation/);assert.match(html,/External analysis is disabled/);assert.match(html,/explicitly sends the loaded image/)});
