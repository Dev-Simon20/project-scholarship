// Simulate file upload to external API
export async function simulateFileUpload(file: File): Promise<string> {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Simulate random success/failure (90% success rate)
  if (Math.random() < 0.1) {
    throw new Error("Upload failed")
  }

  // Generate a mock URL
  const timestamp = Date.now()
  const fileName = file.name.replace(/\s+/g, "_")
  return `https://storage.example.com/scholarship-files/${timestamp}_${fileName}`
}
