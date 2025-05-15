// Simulated database service to mimic Python backend functionality
// In a real implementation, this would make API calls to a Python backend

// Types for database connections
export type DatabaseType = 'teradata' | 'oracle' | 'sqlserver' | 'postgresql' | 'db2' | 'db2-cloud' | 'db2-warehouse';

export interface DatabaseConnection {
  id: string;
  name: string;
  databaseType: DatabaseType;
  host: string;
  port: string;
  database: string;
  username: string;
  connected: boolean;
}

export interface ConversionResult {
  sourceCode: string;
  targetCode: string;
  conversionTime: number;
  successCount: number;
  warningCount: number;
  errorCount: number;
  issues: Array<{
    line: number;
    message: string;
    severity: 'warning' | 'error';
    solution?: string;
  }>;
}

// In-memory storage for simulated data (would be stored in the backend database)
const connections: Record<string, DatabaseConnection> = {};

// Simulated test connection function - would call Python backend API
export const testDatabaseConnection = async (
  type: 'source' | 'target',
  config: {
    databaseType: DatabaseType;
    host: string;
    port: string;
    database: string;
    username: string;
    password: string;
  }
): Promise<{ success: boolean; message?: string }> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Basic validation
  if (!config.host || !config.database || !config.username || !config.password) {
    return { 
      success: false, 
      message: "All connection fields are required" 
    };
  }

  // Simulate different connection results based on inputs
  if (config.host === 'localhost' || config.host.includes('127.0.0.1')) {
    // Local connections always work in our simulation
    const id = `${type}-${Date.now()}`;
    connections[id] = {
      id,
      name: config.database,
      databaseType: config.databaseType,
      host: config.host,
      port: config.port,
      database: config.database,
      username: config.username,
      connected: true
    };
    return { success: true };
  } else if (config.host.includes('example') || config.host.includes('test')) {
    // Example/test hosts always fail in our simulation
    return { 
      success: false, 
      message: "Could not establish connection to the database server" 
    };
  } else {
    // Other hosts have an 80% success rate
    const success = Math.random() < 0.8;
    
    if (success) {
      const id = `${type}-${Date.now()}`;
      connections[id] = {
        id,
        name: config.database,
        databaseType: config.databaseType,
        host: config.host,
        port: config.port,
        database: config.database,
        username: config.username,
        connected: true
      };
    }
    
    return { 
      success, 
      message: success ? undefined : "Connection timed out" 
    };
  }
};

// Get active database connections
export const getDatabaseConnections = (): { 
  source?: DatabaseConnection; 
  target?: DatabaseConnection 
} => {
  let source, target;
  
  // Find source and target connections
  Object.values(connections).forEach(conn => {
    if (conn.id.startsWith('source-')) source = conn;
    if (conn.id.startsWith('target-')) target = conn;
  });
  
  return { source, target };
};

// Simulates Python sqlglot processing
export const convertSqlSyntax = async (
  source: string,
  sourceType: DatabaseType,
  targetType: DatabaseType
): Promise<ConversionResult> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // This is where a real backend would use sqlglot and custom dialect transformation
  let targetCode = source;
  const issues = [];
  
  // Very basic teradata to DB2 conversions using simplified sqlglot-like logic
  if (sourceType === 'teradata' && targetType.includes('db2')) {
    // Replace QUALIFY with row_number() in a subquery
    if (targetCode.includes('QUALIFY')) {
      issues.push({
        line: targetCode.split('\n').findIndex(line => line.includes('QUALIFY')) + 1,
        message: "QUALIFY is not supported in IBM Db2",
        severity: 'error',
        solution: "Converted to standard SQL with ROW_NUMBER()"
      });
      
      targetCode = targetCode.replace(/QUALIFY\s+ROW_NUMBER\(\)\s+OVER\s+\(([^)]+)\)\s*=\s*1/gi, 
        `AND (
  SELECT COUNT(*) 
  FROM table_alias b 
  WHERE b.key = a.key 
  AND (b.order_col > a.order_col OR 
      (b.order_col = a.order_col AND b.id > a.id))
) = 0`);
    }
    
    // Replace DATE syntax
    if (targetCode.includes("DATE '")) {
      targetCode = targetCode.replace(/DATE\s+'([^']+)'/gi, "DATE('$1')");
    }
    
    // Add warnings for potential issues
    if (targetCode.includes('.')) {
      issues.push({
        line: targetCode.split('\n').findIndex(line => line.includes('.')) + 1,
        message: "Table references may require schema qualification in Db2",
        severity: 'warning',
        solution: "Verify schema names in the target database"
      });
    }
  }
  
  // Calculate counts for reporting
  const successCount = 2; // Simulated count of successful conversions
  const warningCount = issues.filter(i => i.severity === 'warning').length;
  const errorCount = issues.filter(i => i.severity === 'error').length;
  
  return {
    sourceCode: source,
    targetCode,
    conversionTime: Math.random() * 1000 + 500, // Simulated conversion time in ms
    successCount,
    warningCount,
    errorCount,
    issues
  };
};

// Function to download a file (client-side functionality)
export const downloadSqlFile = (content: string, filename: string = 'converted_script.sql') => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};

// Simulated schema browser data - would come from actual database connections
export const fetchDatabaseSchema = async (connectionId: string): Promise<any> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return mock schema data
  return {
    schemas: [
      {
        name: "SALES",
        tables: [
          { name: "CUSTOMERS", columns: ["CUSTOMER_ID", "NAME", "EMAIL", "ADDRESS"] },
          { name: "ORDERS", columns: ["ORDER_ID", "CUSTOMER_ID", "ORDER_DATE", "TOTAL"] },
          { name: "PRODUCTS", columns: ["PRODUCT_ID", "NAME", "PRICE", "CATEGORY"] }
        ],
        views: [
          { name: "CUSTOMER_ORDERS", definition: "SELECT c.NAME, o.ORDER_ID, o.ORDER_DATE FROM CUSTOMERS c JOIN ORDERS o ON c.CUSTOMER_ID = o.CUSTOMER_ID" }
        ],
        procedures: [
          { name: "UPDATE_INVENTORY", parameters: ["PRODUCT_ID INT", "QUANTITY INT"] }
        ],
        functions: [
          { name: "CALCULATE_DISCOUNT", parameters: ["PRICE DECIMAL", "CUSTOMER_TIER INT"], returnType: "DECIMAL" }
        ]
      },
      {
        name: "HR",
        tables: [
          { name: "EMPLOYEES", columns: ["EMPLOYEE_ID", "NAME", "POSITION", "SALARY"] },
          { name: "DEPARTMENTS", columns: ["DEPARTMENT_ID", "NAME", "MANAGER_ID"] }
        ],
        views: [
          { name: "DEPARTMENT_SUMMARY", definition: "SELECT d.NAME, COUNT(e.EMPLOYEE_ID) as EMP_COUNT FROM DEPARTMENTS d JOIN EMPLOYEES e ON d.DEPARTMENT_ID = e.DEPARTMENT_ID GROUP BY d.NAME" }
        ],
        procedures: [
          { name: "HIRE_EMPLOYEE", parameters: ["NAME VARCHAR(100)", "POSITION VARCHAR(50)", "SALARY DECIMAL"] }
        ],
        functions: [
          { name: "GET_MANAGER_NAME", parameters: ["DEPT_ID INT"], returnType: "VARCHAR(100)" }
        ]
      }
    ]
  };
};

// Upload and process SQL scripts
export const processSqlFile = async (file: File): Promise<{
  id: string;
  name: string;
  size: number;
  content: string;
  status: 'success' | 'error';
  error?: string;
}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        // Simulate backend processing
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
        
        const content = e.target?.result as string;
        
        // Simple validation - in real app this would be done by the Python backend
        const hasError = Math.random() < 0.2 || content.includes('INVALID_SYNTAX');
        
        resolve({
          id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          size: file.size,
          content,
          status: hasError ? 'error' : 'success',
          error: hasError ? 'Invalid SQL syntax detected' : undefined
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};
