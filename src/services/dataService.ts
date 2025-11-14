import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ModuleData {
  category_id: number;
  tutor_id: number;
  title: string;
  description?: string;
  price: number;
  duration?: number;
  image?: string;
}

class DataService {
  /**
   * Get all modules
   * @returns {Promise<Array>} Array of modules
   */
  static async getAllData(): Promise<any[]> {
    try {
      const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return courses;
    } catch (error: any) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  /**
   * Get module by ID
   * @param {number} id - Module ID
   * @returns {Promise<Object|null>} Module object or null
   */
  static async getDataById(id: number): Promise<any | null> {
    try {
      const course = await prisma.course.findUnique({
        where: { id }
      });
      return course;
    } catch (error: any) {
      throw new Error(`Failed to fetch data by ID: ${error.message}`);
    }
  }

  /**
   * Get modules by attribute
   * @param {string} attribute - Column name
   * @param {any} value - Value to search
   * @returns {Promise<Array>} Array of modules
   */
  static async getDataByAttribute(attribute: string, value: any): Promise<any[]> {
    try {
      const allowedAttributes = ['title', 'price', 'duration'];
      if (!allowedAttributes.includes(attribute)) {
        throw new Error('Invalid attribute');
      }
      
      const whereClause: any = {};
      if (attribute === 'title') {
        whereClause.title = { contains: value };
      } else if (attribute === 'price') {
        whereClause.price = value;
      } else if (attribute === 'duration') {
        whereClause.duration = value;
      }
      
      const courses = await prisma.course.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      });
      return courses;
    } catch (error: any) {
      throw new Error(`Failed to fetch data by attribute: ${error.message}`);
    }
  }

  /**
   * Insert new module
   * @param {Object} data - Module data
   * @returns {Promise<Object>} Created module
   */
  static async insertData(data: ModuleData): Promise<any> {
    try {
      const { category_id, tutor_id, title, description, price, duration, image } = data;
      const course = await prisma.course.create({
        data: {
          categoryId: category_id,
          tutorId: tutor_id,
          title,
          description,
          price,
          duration,
          image
        }
      });
      return course;
    } catch (error: any) {
      throw new Error(`Failed to insert data: ${error.message}`);
    }
  }

  /**
   * Update module by ID
   * @param {number} id - Module ID
   * @param {Object} data - Updated module data
   * @returns {Promise<Object|null>} Updated module or null
   */
  static async updateData(id: number, data: ModuleData): Promise<any | null> {
    try {
      const { category_id, tutor_id, title, description, price, duration, image } = data;
      const course = await prisma.course.update({
        where: { id },
        data: {
          categoryId: category_id,
          tutorId: tutor_id,
          title,
          description,
          price,
          duration,
          image
        }
      });
      return course;
    } catch (error: any) {
      if (error.code === 'P2025') {
        return null;
      }
      throw new Error(`Failed to update data: ${error.message}`);
    }
  }

  /**
   * Delete module by ID
   * @param {number} id - Module ID
   * @returns {Promise<boolean>} Success status
   */
  static async deleteData(id: number): Promise<boolean> {
    try {
      await prisma.course.delete({
        where: { id }
      });
      return true;
    } catch (error: any) {
      if (error.code === 'P2025') {
        return false;
      }
      throw new Error(`Failed to delete data: ${error.message}`);
    }
  }
}

export default DataService;