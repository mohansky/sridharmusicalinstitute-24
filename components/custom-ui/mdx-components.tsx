import Image from "next/image";
import * as runtime from "react/jsx-runtime";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image,
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}

// import Image from "next/image";
// import * as runtime from "react/jsx-runtime";
// import { ComponentType, ReactNode } from "react";

// type ComponentsType = {
//   [key: string]: ComponentType<any>;
// };

// const components: ComponentsType = {
//   Image,
// };

// const useMDXComponent = (code: string) => {
//   const fn = new Function(code);
//   return fn({ ...runtime }).default;
// };

// // const useMDXComponent = (code: string): ComponentType => {
// //   const fn = new Function(code) as () => { default: ComponentType };
// //   return fn({ ...runtime }).default;
// // };

// interface MdxProps {
//   code: string;
// }

// export function MDXContent({ code }: MdxProps) {
//   // if (typeof code !== 'string') {
//   //   return null; // or return a placeholder component
//   // }
  
//   const Component = useMDXComponent(code);
//   return <Component components={components} />;
// }