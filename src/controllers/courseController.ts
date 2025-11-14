import { Request, Response } from 'express';
import prisma from '../config/db';
import { PaginationQuery, ApiResponse, PaginationResponse } from '../utils/types';

export const getCourses = async (req: Request<{}, ApiResponse, {}, PaginationQuery>, res: Response) => {
  try {
    const { 
      category, 
      search, 
      sortBy = 'createdAt', 
      order = 'desc', 
      page = '1', 
      limit = '10' 
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    
    if (category) where.categoryId = parseInt(category);
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } }
      ];
    }

    const totalItems = await prisma.course.count({ where });
    
    const courses = await prisma.course.findMany({
      where,
      orderBy: { [sortBy]: order },
      skip,
      take: limitNum
    });

    const pagination: PaginationResponse = {
      currentPage: pageNum,
      totalPages: Math.ceil(totalItems / limitNum),
      totalItems,
      itemsPerPage: limitNum
    };

    res.json({
      success: true,
      message: 'Courses retrieved successfully',
      data: { courses, pagination }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};