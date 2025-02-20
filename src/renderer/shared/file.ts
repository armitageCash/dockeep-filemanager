export default class FileHandler {
  constructor(private filePath: string) {}

  static getExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  };

  static formatFileSize(bytes: number) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  /**
   * Crea un objeto File a partir de la ruta
   */
  async createFile(): Promise<File> {
    const response = await (window as any).Dockeep.FileManager.readFile(
      this.filePath,
    );

    if (!response.success) {
      throw new Error(response.error);
    }

    const blob = new Blob([response.buffer], {
      type: 'application/octet-stream',
    });
    return new File([blob], response.name, {
      type: 'application/octet-stream',
    });
  }

  /**
   * Crea un FormData con el archivo
   */
  async createFormData(): Promise<FormData> {
    const file = await this.createFile();
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }
}
