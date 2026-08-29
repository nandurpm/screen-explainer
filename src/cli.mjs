#!/usr/bin/env node
/*
 * ============================================================
 * FILE: cli.mjs
 * PURPOSE: Implements Explain This Screenshot's command-line interface and coordinates validation, persistence, report generation, and local serving.
 * ============================================================
 */

import { createReadStream,existsSync } from "node:fs";import { stat } from "node:fs/promises";import { createServer } from "node:http";import { basename,resolve } from "node:path";import { demoProject } from "./demo.mjs";import { writeReport } from "./report.mjs";
const usage=`Screen Explainer — privacy-conscious local screenshot annotation\n\nUsage:\n  screen-explainer demo [--out reports/demo]\n  screen-explainer serve <report-directory> [--port 4073]`;
function parse(args){const values=new Map(),positional=[];for(let i=0;i<args.length;i+=1){const token=args[i];if(!token.startsWith('--')){positional.push(token);continue}const[key,inline]=token.split('=',2);values.set(key,inline??args[++i])}return{values,positional}}const print=value=>process.stdout.write(`${JSON.stringify(value,null,2)}\n`);
async function serve(directory,port){const root=resolve(directory),report=resolve(root,'screen-explainer.html');if(!existsSync(report))throw new Error('Generate a report before serving it.');createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname,name=path==='/'?'screen-explainer.html':basename(path),file=resolve(root,name);try{if(!file.startsWith(`${root}/`))throw Error();const info=await stat(file);if(!info.isFile())throw Error();res.writeHead(200,{'Content-Type':file.endsWith('.json')?'application/json;charset=utf-8':'text/html;charset=utf-8','Cache-Control':'no-store'});createReadStream(file).pipe(res)}catch{res.writeHead(404);res.end('Report not found')}}).listen(port,'127.0.0.1',()=>print({url:`http://127.0.0.1:${port}`,scope:'localhost only'}))}
async function main(){const[command,...args]=process.argv.slice(2);if(!command||command==='help'||command==='--help')return process.stdout.write(`${usage}\n`);const input=parse(args);if(command==='serve')return serve(input.positional[0]??'reports/demo',Number(input.values.get('--port')??process.env.PORT??'4073'));if(command==='demo')return print({outputs:await writeReport(demoProject,input.values.get('--out')??'reports/demo'),mode:'synthetic-private-demo'});throw new Error(`Unknown command: ${command}`)}main().catch(error=>{process.stderr.write(`Error: ${error.message}\n`);process.exitCode=1});
