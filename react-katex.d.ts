declare module 'react-katex' {
    import * as React from 'react';
  
    export interface InlineMathProps {
      children: string;
    }
  
    export interface BlockMathProps {
      children: string;
    }
  
    export class InlineMath extends React.Component<InlineMathProps> {}
    export class BlockMath extends React.Component<BlockMathProps> {}
  }
  