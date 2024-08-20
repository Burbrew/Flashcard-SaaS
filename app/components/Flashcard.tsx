import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

function Flashcard({ content }: { content: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <ReactMarkdown
        className="text-gray-800"
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default Flashcard;
