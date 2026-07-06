import { Alert, Button, Card, Col, Form, Input, Row, Space, Statistic, Table, Tag, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { metrics, type WorkItem, workItems } from "./dashboard-model";

const columns: ColumnsType<WorkItem> = [
  { title: "Task", dataIndex: "title", key: "title" },
  { title: "Owner", dataIndex: "owner", key: "owner", width: 140 },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    width: 110,
    render: (priority) => <Tag color={priority === "P0" ? "red" : priority === "P1" ? "orange" : "blue"}>{priority}</Tag>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 130,
    render: (status) => <Tag>{status}</Tag>,
  },
];

export function DashboardPage() {
  return (
    <Space direction="vertical" size={20} className="page-stack">
      <div className="page-heading">
        <div>
          <Typography.Title level={2}>Operations overview</Typography.Title>
          <Typography.Text type="secondary">Dense enterprise UI with typed data tables and validated forms.</Typography.Text>
        </div>
        <Button type="primary">Create record</Button>
      </div>

      <Row gutter={[16, 16]}>
        {metrics.map((metric) => (
          <Col key={metric.key} xs={24} md={8}>
            <Card>
              <Statistic title={metric.label} value={metric.value} />
              <Tag color={metric.tone === "good" ? "green" : metric.tone === "warn" ? "gold" : "red"}>
                {metric.trend > 0 ? "+" : ""}
                {metric.trend}% weekly
              </Tag>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Priority work queue">
            <Table columns={columns} dataSource={workItems} pagination={false} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Quick action">
            <Form layout="vertical">
              <Form.Item label="Record name" required>
                <Input placeholder="Enter a task or resource" />
              </Form.Item>
              <Form.Item label="Owner">
                <Input placeholder="Team or person" />
              </Form.Item>
              <Button type="primary" block>
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Alert type="info" showIcon message="Profile-ready" description="Use profiles/index.json to map product pages, tables, forms, API clients, and route boundaries." />
    </Space>
  );
}
