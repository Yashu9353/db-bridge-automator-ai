
import { useState } from "react";
import {
  Form,
  TextInput,
  Select,
  SelectItem,
  Button,
  InlineNotification,
  FormGroup,
  Dropdown,
  Grid,
  Column,
  Loading
} from "@carbon/react";
import { testDatabaseConnection, DatabaseType } from "@/services/databaseService";

type ConnectionStatus = "idle" | "testing" | "success" | "error";

type ConnectionFormProps = {
  type: "source" | "target";
  title: string;
};

const DatabaseConnector = ({ type, title }: ConnectionFormProps) => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: type === "source" ? "teradata" as DatabaseType : "db2" as DatabaseType,
    host: "",
    port: type === "source" ? "1025" : "50000",
    database: "",
    username: "",
    password: "",
    saveCredentials: false,
  });
  
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Reset connection status when form changes
    if (connectionStatus !== "idle") {
      setConnectionStatus("idle");
      setErrorMessage(null);
    }
  };
  
  const handleTestConnection = async () => {
    setConnectionStatus("testing");
    setErrorMessage(null);
    
    try {
      const result = await testDatabaseConnection(type, {
        type: formData.type,
        host: formData.host,
        port: formData.port,
        database: formData.database,
        username: formData.username,
        password: formData.password
      });
      
      if (result.success) {
        setConnectionStatus("success");
      } else {
        setConnectionStatus("error");
        setErrorMessage(result.message || "Connection failed. Please check your settings.");
      }
    } catch (error) {
      setConnectionStatus("error");
      setErrorMessage("An unexpected error occurred");
    }
  };
  
  const databaseOptions = type === "source" 
    ? [
        { id: "teradata", text: "Teradata" },
        { id: "oracle", text: "Oracle" },
        { id: "sqlserver", text: "SQL Server" },
        { id: "postgresql", text: "PostgreSQL" }
      ]
    : [
        { id: "db2", text: "IBM Db2" },
        { id: "db2-cloud", text: "IBM Db2 on Cloud" },
        { id: "db2-warehouse", text: "IBM Db2 Warehouse" }
      ];
  
  return (
    <div className="cds--tile">
      <h3 className="cds--productive-heading-03 mb-05">{title}</h3>
      
      <Form>
        <Grid condensed>
          <Column lg={16} md={8} sm={4}>
            <FormGroup legendText="Database Type">
              <Dropdown
                id={`${type}-database-type`}
                titleText=""
                label="Select database type"
                items={databaseOptions}
                itemToString={(item) => (item ? item.text : '')}
                selectedItem={databaseOptions.find(item => item.id === formData.type)}
                onChange={({ selectedItem }) => 
                  handleInputChange("type", selectedItem?.id as DatabaseType || formData.type)
                }
              />
            </FormGroup>
          </Column>
          
          <Column lg={8} md={4} sm={2}>
            <TextInput
              id={`${type}-host`}
              labelText="Host / Server"
              value={formData.host}
              onChange={(e) => handleInputChange("host", e.target.value)}
              placeholder="e.g., localhost or 192.168.1.1"
            />
          </Column>
          
          <Column lg={8} md={4} sm={2}>
            <TextInput
              id={`${type}-port`}
              labelText="Port"
              value={formData.port}
              onChange={(e) => handleInputChange("port", e.target.value)}
            />
          </Column>
          
          <Column lg={16} md={8} sm={4}>
            <TextInput
              id={`${type}-database`}
              labelText="Database Name"
              value={formData.database}
              onChange={(e) => handleInputChange("database", e.target.value)}
              placeholder="Enter database name"
            />
          </Column>
          
          <Column lg={8} md={4} sm={2}>
            <TextInput
              id={`${type}-username`}
              labelText="Username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter username"
            />
          </Column>
          
          <Column lg={8} md={4} sm={2}>
            <TextInput
              id={`${type}-password`}
              type="password"
              labelText="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password"
            />
          </Column>
        </Grid>
        
        <div className="mt-05">
          <Button
            kind="tertiary"
            onClick={handleTestConnection}
            disabled={connectionStatus === "testing"}
            className="mr-2"
          >
            {connectionStatus === "testing" ? (
              <div className="flex items-center">
                <Loading small description="Testing..." withOverlay={false} />
                <span className="ml-2">Testing...</span>
              </div>
            ) : "Test Connection"}
          </Button>
          
          {connectionStatus === "success" && (
            <InlineNotification
              kind="success"
              title="Success"
              subtitle="Connection successful"
              hideCloseButton
            />
          )}
          
          {connectionStatus === "error" && errorMessage && (
            <InlineNotification
              kind="error"
              title="Error"
              subtitle={errorMessage}
              hideCloseButton
            />
          )}
        </div>
      </Form>
    </div>
  );
};

export default DatabaseConnector;
