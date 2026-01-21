import { Request, Response } from 'express';
import Setting from '../models/Setting';
import { randomUUID } from 'crypto';

export const createSetting = async (req: Request, res: Response) => {
    console.log('Creating setting for:', req.body);
    try {
        const { name, value } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }

        const newSetting = new Setting({ name, value });
        const savedSetting = await newSetting.save();

        console.log('Saved setting:', savedSetting);

        return res.status(200).json(savedSetting);
    } catch (error) {
        console.error('Error creating setting:', error);
        return res.status(500).json({ message: 'Controller failed to create new setting' });
    }
};

export const getSettings = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 20;
        const skip = (page - 1) * limit;

        const total = await Setting.countDocuments();
        const settings = await Setting.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const hasMore = skip + settings.length < total;

        return res.status(200).json({
            data: settings,
            meta: {
                page,
                limit,
                total,
                hasMore
            }
        });
    } catch (error) {
        console.error('Error fetching settings:', error);
        return res.status(500).json({ message: 'Controller failed to fetch settings' });
    }
};

export const getSettingByKey = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const setting = await Setting.findById(id);
        if (!setting) {
            return res.status(404).json({ message: 'Setting not found' });
        }
        return res.status(200).json(setting);
    } catch (error) {
        console.error('Error fetching setting:', error);
        return res.status(500).json({ message: 'Controller failed to fetch setting' });
    }
};

export const updateSetting = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { value } = req.body;

    try {
        const updatedSetting = await Setting.findByIdAndUpdate(
            id,
            { value }, // Only update value, ignore name changes
            { new: true } // Return the updated document
        );

        if (!updatedSetting) {
            return res.status(404).json({ message: 'Setting not found' });
        }

        return res.status(200).json(updatedSetting);
    } catch (error) {
        console.error('Error updating setting:', error);
        return res.status(500).json({ message: 'Controller failed to update setting' });
    }
};

export const deleteSetting = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedSetting = await Setting.findByIdAndDelete(id);

        if (!deletedSetting) {
            return res.status(404).json({ message: 'Setting not found' });
        }

        return res.status(200).json({ message: 'Setting deleted successfully' });
    } catch (error) {
        console.error('Error deleting setting:', error);
        return res.status(500).json({ message: 'Controller failed to delete setting' });
    }
};
