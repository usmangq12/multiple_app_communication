import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Handle,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const CustomNode1 = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, backgroundColor: 'lightblue' }}>
      <div style={{ marginBottom: 5 }}>{data.label}</div>
      <svg width="100" height="50">
        <circle cx="25" cy="25" r="20" fill="orange" />
        <line x1="25" y1="25" x2="75" y2="25" stroke="black" strokeWidth="2" />
        <rect x="75" y="15" width="20" height="20" fill="green" />
      </svg>
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};


const CustomNode2 = ({ data }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #777', borderRadius: 5, backgroundColor: 'lightgreen' }}>
      <div style={{ marginBottom: 5 }}>{data.label}</div>
      {/* Small Diagram for Custom Node 2 */}
      <svg width="100" height="50">
        <rect x="10" y="10" width="30" height="30" fill="red" />
        <circle cx="70" cy="25" r="15" fill="blue" />
        <line x1="10" y1="10" x2="70" y2="25" stroke="black" strokeWidth="2" />
      </svg>
      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
};

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start here..." },
    position: { x: -150, y: 0 },
  },
  {
    id: "2",
    type: "input",
    data: { label: "...or here!" },
    position: { x: 150, y: 0 },
  },
  {
    id: "3",
    type: "customNode1",
    data: { label: "Custom Node 1" },
    position: { x: 0, y: 150 },
  },
  {
    id: "4",
    type: "customNode2",
    data: { label: "Custom Node 2" },
    position: { x: -150, y: 300 },
  },
  {
    id: "5",
    type: "output",
    data: { label: "End here!" },
    position: { x: 150, y: 350 },
  },
  {
    id: "6",
    type: "output",
    data: { label: "End here!" },
    position: { x: -150, y: 500 },
  },
];

const initialEdges = [
  { id: "1->3", source: "1", target: "3" },
  { id: "2->3", source: "2", target: "3" },
  { id: "3->4", source: "3", target: "4" },
  { id: "3->5", source: "3", target: "5" },
  {id : "4->6", source: "4", target: "6"}
];

export default function FlowDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges(addEdge(params, edges)),
    [edges]
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  return (
    <div className="w-full h-screen fixed top-24">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="top-right"
        nodeTypes={{ customNode1: CustomNode1, customNode2: CustomNode2 }}
      >
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
