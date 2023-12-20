import React from "react";
import {Button, ConfigProvider} from "antd";
import styles from "./custom-button.module.scss"
import "../../App.scss"

type Props = {
  theme?: any,
  children: React.ReactNode;
  htmlType?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  type?: "primary" | "link" | "text" | "default" | "dashed";
  danger?: boolean;
  loading?: boolean;
  shape?: "circle" | "default" | "round" | undefined;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean
};

export const CustomButton = (
  {
    theme,
    children,
    type,
    danger,
    loading,
    htmlType = 'button',
    onClick,
    shape,
    icon,
    style,
    disabled = false
  }: Props) => {
  return (
    // <Form.Item>
    <ConfigProvider theme={theme}>
      <Button
        className={styles.btn}
        type={type}
        htmlType={htmlType}
        danger={danger}
        loading={loading}
        // size="large"
        shape={shape}
        onClick={onClick}
        icon={icon}
        style={style}
        disabled={disabled}
      >
        {children}
      </Button>
    </ConfigProvider>
    // </Form.Item>
  );
};
