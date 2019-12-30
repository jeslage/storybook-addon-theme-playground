import * as React from 'react';

import StyledCode from './Code.style';

interface CodeProps {
  value: object;
}

const Code: React.FC<CodeProps> = ({ value }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    const element = document.createElement('textarea');
    element.value = JSON.stringify(value, null, 2);
    element.setAttribute('readonly', '');
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    setCopied(true);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <StyledCode>
      <code>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </code>
      <button type="button" onClick={copyToClipboard} disabled={copied}>
        {copied ? 'Copied' : 'Copy'}
      </button>
    </StyledCode>
  );
};

export default Code;
