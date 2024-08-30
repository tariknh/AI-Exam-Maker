import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Write me a json object containing structured tasks from the exam im giving you. I want you to format it as a proffesional exam. ${content}`,
      },
    ],
    model: "gpt-3.5-turbo-0125",
    stream: true,
  });

  console.log({ content });
  return new Response("ok");
}
