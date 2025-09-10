import React, { useEffect, useMemo, useState } from "react";
import {
  Folder,
  FileText,
  ChevronRight,
  ChevronDown,
  Search,
  Files,
  GitBranch,
  Play,
  Bug,
  Puzzle, // replacement for invalid "Extensions"
  Settings,
  Bell,
  TerminalSquare,
  AlignLeft
} from "lucide-react";

// VS Code color palette
const colors = {
  activityBar: "#333333",
  sideBar: "#252526",
  sideBarHeader: "#2d2d2d",
  editorBg: "#1e1e1e",
  editorPane: "#1e1e1e",
  tabBg: "#2d2d2d",
  tabActive: "#1e1e1e",
  border: "#3c3c3c",
  statusBar: "#007acc",
  //text: "#cccccc",
  textMuted: "#9b9b9b",
  treeHover: "#2a2d2e",
  treeActive: "#37373d"
};

const sampleTree = [
  {
    id: "1",
    name: "chat_open",
    type: "folder",
    children: [
      {
        id: "1-3",
        name: "default",
        type: "folder",
        children: [
          { id: "1-3-1", name: "supportai_response contains 'tag'", type: "file" },
          { id: "1-3-2", name: "supportai_response contains 'replay'", type: "file" }
        ]
      }
    ]
  },
  //{ id: "2", name: "README.md", type: "file" },
  //{ id: "3", name: "package.json", type: "file" }
];

function TreeItem({ node, level = 0, onOpen, activeId }) {
  const [open, setOpen] = useState(true);
  const isFolder = node.type === "folder";
  const padding = 8 + level * 12;
  const active = activeId === node.id;

  return (
    <div>
      <div
        className={`flex items-center select-none cursor-pointer text-sm`}
        style={{
          padding: "4px 8px",
          paddingLeft: padding,
          color: colors.text,
          background: active ? colors.treeActive : "transparent"
        }}
        onClick={() => {
          if (isFolder) setOpen(!open);
          else onOpen?.(node);
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = active ? colors.treeActive : colors.treeHover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = active ? colors.treeActive : "transparent")
        }
      >
        {isFolder ? (
          open ? (
            <ChevronDown size={16} className="mr-1" />
          ) : (
            <ChevronRight size={16} className="mr-1" />
          )
        ) : (
          <span className="w-4 mr-1" />
        )}
        {isFolder ? (
          <Folder size={16} className="mr-2" />
        ) : (
          <FileText size={16} className="mr-2" />
        )}
        <span className="truncate" title={node.name}>
          {node.name}
        </span>
      </div>
      {isFolder && open && (
        <div>
          {node.children?.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              onOpen={onOpen}
              activeId={activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const codeSamples = {
  "1-1": `// index.ts\nexport const hello = (name: string) => {\n  return \`Hello, \${name}!\`;\n};\n\nconsole.log(hello("World"));`,
  "1-2": `// app.tsx\nimport React from 'react'\n\nexport default function App(){\n  return <button>Click</button>\n}`,
  "1-4": `{# Тут jinja шаблон #}`,
  "1-3-1": `{# Тут jinja шаблон #}`,
  "1-3-2": `{# Тут jinja шаблон #}`,
  "2": `# README\n\nЭто макет интерфейса «как VS Code» вокруг Monaco.\n`,
  "3": `{\n  "name": "mock",\n  "private": true\n}`
};

// ---- Tiny test helpers (no external libs) ----
function flattenFileIds(tree) {
  const out = [];
  const walk = (n) => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (n.type === "file") out.push(n.id);
    if (n.children) n.children.forEach(walk);
  };
  walk(tree);
  return out;
}

function simulateCloseTabs(tabs, activeId, closeId) {
  const idx = tabs.findIndex((t) => t.id === closeId);
  const next = tabs.filter((t) => t.id !== closeId);
  let nextActive = activeId;
  if (closeId === activeId) {
    const fallback = next[idx - 1] || next[idx] || null;
    nextActive = fallback?.id || "";
  }
  return { next, nextActive };
}

function ensureNoDupOpen(tabs, nodeId, label) {
  if (tabs.find((t) => t.id === nodeId)) return tabs;
  return [...tabs, { id: nodeId, label }];
}

function runTests() {
  const tests = [];
  // T1: every file id has content
  const fileIds = flattenFileIds(sampleTree);
  const missing = fileIds.filter((id) => !(id in codeSamples));
  tests.push({
    name: "Every file in tree has codeSamples entry",
    pass: missing.length === 0,
    details: missing.length ? `Missing: ${missing.join(",")}` : "OK"
  });

  // T2: closing active tab selects left neighbor (or next)
  const tabs2 = [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" }
  ];
  const r2 = simulateCloseTabs(tabs2, "b", "b");
  tests.push({
    name: "Close active picks left neighbor",
    pass: r2.nextActive === "a" && r2.next.length === 2,
    details: JSON.stringify(r2)
  });

  // T3: adding an already-open tab doesn't duplicate
  const tabs3 = [{ id: "x", label: "x" }];
  const r3 = ensureNoDupOpen(tabs3, "x", "x");
  const r3b = ensureNoDupOpen(tabs3, "y", "y");
  tests.push({
    name: "No duplicate tabs when opening",
    pass: r3.length === 1 && r3b.length === 2,
    details: `lenA=${r3.length}, lenB=${r3b.length}`
  });

  // T4: tree flattener collects all files
  tests.push({
    name: "Flatten collects 6 file ids",
    pass: fileIds.length === 6,
    details: `count=${fileIds.length} ids=${fileIds.join(",")}`
  });

  return tests;
}

export default function VSCodeLikeMockup() {
  const [activeId, setActiveId] = useState();
  const [openTabs, setOpenTabs] = useState([]);

  const [tests, setTests] = useState([]);
  const passCount = useMemo(() => tests.filter((t) => t.pass).length, [tests]);
  const [showTests, setShowTests] = useState(false);

  useEffect(() => {
    setTests(runTests());
  }, []);

  const openNode = (node) => {
    setActiveId(node.id);
    setOpenTabs((tabs) => ensureNoDupOpen(tabs, node.id, node.name));
  };

  const closeTab = (id) => {
    setOpenTabs((tabs) => {
      const { next, nextActive } = simulateCloseTabs(tabs, activeId, id);
      if (id === activeId) setActiveId(nextActive);
      return next;
    });
  };

  return (
    <div
      className="w-full h-screen"
      style={{
        background: colors.editorBg,
        color: colors.text,
        fontFamily: "Inter, ui-sans-serif, system-ui"
      }}
    >
      {/* Top bar placeholder (optional) */}
      <div
        className="w-full h-10 flex items-center px-3"
        style={{ background: colors.tabBg, borderBottom: `1px solid ${colors.border}` }}
      >
        <span className="text-sm text-gray-300">Jinja | Входящие интеграции</span>
      </div>

      <div className="flex h-[calc(100vh-40px)]">
        {/* Side Bar */}
        <div
          className="flex flex-col"
          style={{ width: 280, background: colors.sideBar, borderRight: `1px solid ${colors.border}` }}
        >
          <div
            className="flex items-center justify-between h-9 px-3 text-xs"
            style={{ background: colors.sideBarHeader, borderBottom: `1px solid ${colors.border}` }}
          >
            <div className="flex items-center gap-2">
              <AlignLeft size={14} />
              <span className="uppercase tracking-wider text-gray-300">Действия/Колбэки</span>
            </div>
          </div>

          {/* Workspace title */}
          <div className="px-3 py-2 text-[11px] uppercase tracking-wider text-gray-400">Samsara</div>

          {/* Tree */}
          <div className="overflow-auto">
            {sampleTree.map((node) => (
              <TreeItem key={node.id} node={node} onOpen={openNode} activeId={activeId} />
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col" style={{ background: colors.editorPane }}>
          {/* Tabs */}
          <div
            className="flex items-center h-9 overflow-x-auto"
            style={{ background: colors.tabBg, borderBottom: `1px solid ${colors.border}` }}
          >
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className="flex items-center gap-2 px-3 h-9 text-sm cursor-pointer"
                style={{
                  background: tab.id === activeId ? colors.tabActive : "transparent",
                  borderRight: `1px solid ${colors.border}`
                }}
                onClick={() => setActiveId(tab.id)}
              >
                <FileText size={14} />
                <span className="whitespace-nowrap">{tab.label}</span>
                <button
                  className="ml-1 text-gray-400 hover:text-gray-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Fake Monaco (code preview) */}
          <div
            className="flex-1 overflow-auto p-6 text-sm leading-6"
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"
            }}
          >
            <pre className="whitespace-pre-wrap">{codeSamples[activeId] || "// Выберите элемент слева"}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
