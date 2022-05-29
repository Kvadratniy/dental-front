export function downloadFile(file: string, name: string): void {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  a.href = file;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(a.href);
}
