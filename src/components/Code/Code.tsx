import React, { useState, useEffect } from 'react';

import StyledCode from './Code.style';

interface CodeProps {
  value: any;
}

const Code = ({ value }: CodeProps) => {
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [copied]);

  return (
    <StyledCode>
      <div className="code__wrapper">
        <code>
          <pre>{JSON.stringify(value, null, 2)}</pre>
        </code>
        <button type="button" onClick={copyToClipboard} disabled={copied}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </StyledCode>
  );
};

export default Code;
