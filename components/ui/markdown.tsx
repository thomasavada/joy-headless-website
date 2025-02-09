import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        h3: ({ children }) => (
          <h3 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h3>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 space-y-2 mt-4">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="text-muted-foreground">{children}</li>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground mb-4">{children}</p>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
} 