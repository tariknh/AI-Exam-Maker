import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();
  const { GoogleGenerativeAI } = require("@google/generative-ai");

  // Make sure to include these imports:
  // import { GoogleGenerativeAI } from "@google/generative-ai";
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Write me a json object containing structured tasks from the exam im giving you. I want you to format it as a proffesional exam. I also want the equations in katex format Please return the output as a valid JSON string. The different fields i want is: interface Part {
  letter: string;
  description: string;
}

interface Task {
  task_number: number;
  title: string;
  description?: string;
  parts?: Part[];
}

interface Exam {
  name: string;
  date: string;
  time: string;
  language: string;
  allowed_aids: string;
  instructor: string;
  tasks: Task[];
} Here is the exam:  ${content}`;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  // const chatCompletion = await openai.chat.completions.create({
  //   messages: [
  //     {
  //       role: "user",
  //       content: `Write me a json object containing structured tasks from the exam im giving you. I want you to format it as a proffesional exam. ${content}`,
  //     },
  //   ],
  //   model: "gpt-3.5-turbo-0125",
  //   stream: true,
  // });

  console.log({ content });
  console.log(typeof result.response, "TYPE OF RESPONSE FROM ROUTE.TS");
  return Response.json(result.response.text());
}
