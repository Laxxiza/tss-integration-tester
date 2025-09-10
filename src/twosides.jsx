import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function SplitMonaco() {
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(400);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      let newWidth = e.clientX - containerRect.left;

      const minWidth = 100;
      const maxWidth = containerRect.width - 100;
      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;

      setLeftWidth(newWidth);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const startDrag = () => {
    isDragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Левая панель */}
      <div style={{ width: leftWidth }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={`// Left editor\nconsole.log("Left");`}
          options={{ minimap: { enabled: false }, theme: "vs-dark" }}
          onMount={(editor, monaco) => {
            editor.layout(); // пересчитываем размеры после рендера
          }}
        />
      </div>

      {/* Разделитель */}
      <div
        onMouseDown={startDrag}
        style={{
          width: 5,
          cursor: "col-resize",
          backgroundColor: "rgb(30 30 30)",
          zIndex: 10,
        }}
        className="hover:bg-sky-700"
      />

      {/* Правая панель */}
      <div style={{ flexGrow: 1, overflow: "hidden" }}>
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={`// Right editor\nconsole.log("Right");`}
          options={{ minimap: { enabled: false }, theme: "vs-dark" }}
          onMount={(editor, monaco) => {
            editor.layout(); // пересчитываем размеры после рендера
          }}
        />
      </div>
    </div>
  );
}
