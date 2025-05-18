// Simulated database service to mimic Python backend functionality
// In a real implementation, this would make API calls to a Python backend

// Types for database connections
export type DatabaseType = 'teradata' | 'oracle' | 'sqlserver' | 'postgresql' | 'db2' | 'db2-cloud' | 'db2-warehouse' | 'other';

export interface DatabaseConnection {
  id: string;
  name: string;
  type: DatabaseType;
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
}

interface ConnectionResult {
  success: boolean;
  message?: string;
}

interface ConversionResult {
  targetCode: string;
  issues: Array<{
    line: number;
    message: string;
    severity: 'warning' | 'error';
    solution?: string;
  }>;
  successCount: number;
  warningCount: number;
  errorCount: number;
}

// Simulated function to test a database connection
export const testDatabaseConnection = async (
  connectionType: 'source' | 'target', 
  connection: Partial<DatabaseConnection>
): Promise<ConnectionResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // This is just a simulation - in a real app this would make an API call
  const requiredFields = ['host', 'port', 'database', 'username', 'password'];
  const missingFields = requiredFields.filter(field => !connection[field as keyof typeof connection]);
  
  if (missingFields.length > 0) {
    return {
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  // For demo purposes, let's say Teradata connections to localhost:1025 always work
  if (connection.databaseType === 'teradata' && connection.host === 'localhost' && connection.port === '1025') {
    return {
      success: true
    };
  }
  
  // For demo purposes, let's say DB2 connections to localhost:50000 always work
  if (connection.databaseType?.startsWith('db2') && connection.host === 'localhost' && connection.port === '50000') {
    return {
      success: true
    };
  }
  
  // Otherwise randomly succeed or fail for demo purposes
  const randomSuccess = Math.random() > 0.3;
  
  return {
    success: randomSuccess,
    message: randomSuccess ? undefined : `Connection failed: ${
      Math.random() > 0.5 
        ? 'Network error' 
        : 'Authentication failed'
    }`
  };
};

// Simulated function to convert SQL syntax between dialects
export const convertSqlSyntax = async (
  sourceCode: string,
  sourceType: 'teradata' | 'other',
  targetType: 'db2'
): Promise<ConversionResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  let convertedCode = sourceCode;
  const issues: ConversionResult['issues'] = [];
  
  // For demo: Detect and convert Teradata's SEL to SELECT
  if (sourceCode.toLowerCase().includes('sel ')) {
    convertedCode = convertedCode.replace(/sel /gi, 'SELECT ');
    issues.push({
      line: sourceCode.toLowerCase().split('\n').findIndex(line => 
        line.toLowerCase().trim().startsWith('sel ')) + 1,
      message: "SEL abbreviation is not supported in Db2, changed to SELECT",
      severity: 'warning',
      solution: "Check that the SELECT statement is correctly formatted"
    });
  }
  
  // For demo: Convert Teradata's DATE syntax
  if (sourceCode.includes("DATE '")) {
    convertedCode = convertedCode.replace(/DATE '([^']+)'/g, "DATE('$1')");
    issues.push({
      line: sourceCode.split('\n').findIndex(line => 
        line.includes("DATE '")) + 1,
      message: "Teradata DATE literal format converted to DB2 format",
      severity: 'warning',
      solution: "Review the DATE function conversion for accuracy"
    });
  }
  
  // For demo: Handle QUALIFY keyword (complex conversion)
  if (sourceCode.toLowerCase().includes('qualify')) {
    // This is a very simplified conversion - a real parser would do this properly
    const qualifyLine = sourceCode.toLowerCase().split('\n').findIndex(line => 
      line.toLowerCase().includes('qualify'));
    
    convertedCode = convertedCode.replace(
      /QUALIFY\s+ROW_NUMBER\(\)\s+OVER\s+\(PARTITION BY\s+([^\s]+)\s+ORDER BY\s+([^\s]+)(?:\s+([^\s]+))?\)\s+=\s+1/gi,
      `AND (\n  SELECT COUNT(*) \n  FROM order_db.orders b2 \n  WHERE b2.customer_id = $1 \n  AND (b2.order_date {'>'} $2 OR \n      (b2.order_date = $2 AND b2.order_id {'>'} b.order_id))\n) = 0`
    );
    
    issues.push({
      line: qualifyLine + 1,
      message: "QUALIFY clause is not supported in Db2, converted to equivalent subquery",
      severity: 'warning',
      solution: "Verify the generated subquery logic matches the original QUALIFY intent"
    });
  }
  
  // Count severity types
  const warningCount = issues.filter(issue => issue.severity === 'warning').length;
  const errorCount = issues.filter(issue => issue.severity === 'error').length;
  
  return {
    targetCode: convertedCode,
    issues,
    successCount: 1, // Assuming single SQL statement for demo
    warningCount,
    errorCount
  };
};

// Function to download SQL file
export const downloadSqlFile = (sqlContent: string, filename: string): void => {
  const blob = new Blob([sqlContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Function to process SQL file uploads
export const processSqlFile = async (file: File): Promise<{
  status: 'success' | 'error';
  content?: string;
  error?: string;
}> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  try {
    // Read the file content
    const content = await readFileAsText(file);
    
    // For demo purposes, randomly fail some files
    if (Math.random() > 0.9) {
      return {
        status: 'error',
        error: 'Invalid SQL syntax detected'
      };
    }
    
    return {
      status: 'success',
      content
    };
  } catch (error) {
    return {
      status: 'error',
      error: 'Failed to read file content'
    };
  }
};

// Helper function to read file content
const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
