import React from "react";

export default function BingSearch() {
  return (
    <iframe
      onClick={() => {
        console.log("click");
      }}
      style={{ width: "100%", height: "100%" }}
      src="https://www.bing.com/?search"
    ></iframe>
  );
}
