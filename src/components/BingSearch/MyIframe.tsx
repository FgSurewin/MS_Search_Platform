import React from "react";

export interface IMyIframe {
  url: string;
}

const MyIframe = ({ url }: IMyIframe) => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const iframeDoc = iframeRef.current?.contentDocument;
    iframeDoc?.addEventListener("click", (e) => e.preventDefault());
    iframeDoc?.addEventListener("mouseup", (e) => e.preventDefault());
    iframeDoc?.addEventListener("mousedown", (e) => e.preventDefault());
    // return () => {
    //   iframeDoc?.removeEventListener("click", (e) => e.preventDefault());
    // };
  }, [iframeRef]);

  return (
    <iframe
      ref={iframeRef}
      src={url}
      style={{
        width: "92%",
        height: "90%",
        position: "absolute",
        top: "2%",
        left: "4%",
      }}
      sandbox="allow-same-origin allow-pointer-lock allow-scripts"
    />
  );
};

export default MyIframe;
