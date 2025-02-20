interface DockeepData {
  data?: any;
  auth?: any;
}

class LocalStorageService {
  private static STORAGE_KEY = 'dockeep-data';

  /**
   * Guarda el sessionId y los datos iniciales en el localStorage.
   * @param data Datos del formulario.
   */
  static saveData(data: DockeepData): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  /**
   * Actualiza los datos del formulario en el localStorage.
   * @param updatedData Datos actualizados del formulario.
   */
  static updateData(updatedData: Partial<DockeepData>): void {
    const currentData = this.getData();

    if (currentData) {
      const updatedFormData: DockeepData = {
        data: { ...currentData.data, ...updatedData },
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFormData));
    }
  }

  /**
   * Recupera los datos almacenados en el localStorage.
   * @returns Los datos del formulario o null si no existen.
   */
  static getData(): DockeepData | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Limpia los datos almacenados en el localStorage.
   */
  static clearData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

export default LocalStorageService;
