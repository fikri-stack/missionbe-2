import express from 'express';
import DataService from '../services/dataService';

type Request = express.Request;
type Response = express.Response;

class DataController {
  /**
   * Get all modules
   */
  static async getAllData(req: Request, res: Response): Promise<void> {
    try {
      const data = await DataService.getAllData();
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: data
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Get module by ID
   */
  static async getDataById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(Number(id))) {
        res.status(400).json({
          success: false,
          message: 'Invalid ID parameter',
          data: null
        });
        return;
      }

      const data = await DataService.getDataById(parseInt(id));
      
      if (!data) {
        res.status(404).json({
          success: false,
          message: 'Data not found',
          data: null
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: data
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Create new module
   */
  static async createData(req: Request, res: Response): Promise<void> {
    try {
      const { category_id, tutor_id, title, description, price, duration, image } = req.body;

      // Input validation
      if (!category_id || !tutor_id || !title || !price) {
        res.status(400).json({
          success: false,
          message: 'category_id, tutor_id, title, and price are required',
          data: null
        });
        return;
      }

      if (isNaN(category_id) || isNaN(tutor_id) || isNaN(price)) {
        res.status(400).json({
          success: false,
          message: 'category_id, tutor_id, and price must be numbers',
          data: null
        });
        return;
      }

      const data = await DataService.insertData({
        category_id: parseInt(category_id),
        tutor_id: parseInt(tutor_id),
        title,
        description: description || '',
        price: parseFloat(price),
        duration: duration ? parseInt(duration) : undefined,
        image: image || undefined
      });

      res.status(201).json({
        success: true,
        message: 'Data created successfully',
        data: data
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Update module by ID
   */
  static async updateData(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { category_id, tutor_id, title, description, price, duration, image } = req.body;

      if ( isNaN(Number(id))) {
        res.status(400).json({
          success: false,
          message: 'Invalid ID parameter',
          data: null
        });
        return;
      }

      // Input validation
      if (!category_id || !tutor_id || !title || !price) {
        res.status(400).json({
          success: false,
          message: 'category_id, tutor_id, title, and price are required',
          data: null
        });
        return;
      }

      if (isNaN(category_id) || isNaN(tutor_id) || isNaN(price)) {
        res.status(400).json({
          success: false,
          message: 'category_id, tutor_id, and price must be numbers',
          data: null
        });
        return;
      }

      const data = await DataService.updateData(parseInt(id), {
        category_id: parseInt(category_id),
        tutor_id: parseInt(tutor_id),
        title,
        description: description || '',
        price: parseFloat(price),
        duration: duration ? parseInt(duration) : undefined,
        image: image || undefined
      });

      if (!data) {
        res.status(404).json({
          success: false,
          message: 'Data not found',
          data: null
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Data updated successfully',
        data: data
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  /**
   * Delete module by ID
   */
  static async deleteData(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (isNaN(Number(id))) {
        res.status(400).json({
          success: false,
          message: 'Invalid ID parameter',
          data: null
        });
        return;
      }

      const success = await DataService.deleteData(parseInt(id));

      if (!success) {
        res.status(404).json({
          success: false,
          message: 'Data not found',
          data: null
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Data deleted successfully',
        data: null
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }
}

export default DataController;