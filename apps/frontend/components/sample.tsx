"use client";

import { useEffect } from "react";

export default function Sample() {
  useEffect(() => {
    fetch("http://localhost:5001")
      .then((res) => res.text())
      .then((data) => console.log(data));
  }, []);

  return <div>Sample</div>;
}
