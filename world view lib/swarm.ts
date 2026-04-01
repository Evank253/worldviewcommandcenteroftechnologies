import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function runSwarm(events: any[]) {
  const input = JSON.stringify(events.slice(0, 10));

  const completion = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'user', content: `Analyze trends:\n${input}` },
    ],
  });

  return {
    aiInsight: completion.choices[0].message.content,
  };
}