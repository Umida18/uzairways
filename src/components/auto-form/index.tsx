import { Col, Form, Input, InputNumber, Row, Spin } from "antd/lib";
import React from "react";
import { Select, type FormInstance, type SelectProps } from "antd";
import { Rule } from "antd/es/form";
// import FileUploadToStrapi from "../upload";
import TextArea from "antd/lib/input/TextArea";

export type FieldType = {
  label: string | React.ReactNode;
  name: string;
  type?:
    | "input"
    | "select"
    | "selectTag"
    | "checkbox"
    | "number"
    | "password"
    | "file"
    | "textarea";
  options?: SelectProps["options"];
  span?: number;
  rules?: Rule[];
};

export const Field = ({
  field,
  columnSize,
}: {
  field: FieldType;
  columnSize?: number;
}) => {
  if (!field.type) field.type = "input";

  const getElement = () => {
    switch (field.type) {
      case "input":
        return <Input />;
      case "selectTag":
        return (
          <Select
            className="w-full"
            mode="tags"
            placeholder="Please select"
            defaultValue={[]}
            style={{ width: "100%" }}
            options={field.options}
          />
        );
      case "select":
        return <Select options={field.options} className="w-full" />;
      case "number":
        return <InputNumber className="w-full" />;
      case "password":
        return <Input.Password />;
      case "textarea":
        return <TextArea />;
      // case "file":
      //   return <FileUploadToStrapi />;
    }
  };

  let formItemProps = {};
  switch (field.type) {
    case "file":
      formItemProps = {
        valuePropName: "fileList",
        getValueFromEvent: (e: any) => e,
      };
      break;
    case "checkbox":
      formItemProps = { valuePropName: "checked" };
      break;
  }

  return (
    <Col span={field.span ?? 24 / (columnSize ?? 2)}>
      <Form.Item
        name={field.name}
        label={field.label}
        rules={field.rules}
        {...formItemProps}
      >
        {getElement()}
      </Form.Item>
    </Col>
  );
};

export const AutoForm = ({
  fields,
  columnSize,
  form,
  onFinish,
  loading,
}: {
  fields: FieldType[];
  columnSize?: number;
  form: FormInstance<any>;
  onFinish: (values: Record<string, any>) => void;
  loading: boolean;
}) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {loading && <Spin />}
      <Row gutter={[16, 0]}>
        {fields.map((field, index) => (
          <Field key={index} field={field} columnSize={columnSize} />
        ))}
      </Row>
    </Form>
  );
};
