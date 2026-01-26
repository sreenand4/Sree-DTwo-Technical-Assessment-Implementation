import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import settingsRoutes from '../routes/settingsRoutes';
import Setting from '../models/Setting';

const app = express();
app.use(express.json());
app.use('/settings', settingsRoutes);

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Setting.deleteMany({});
});

describe('Settings API', () => {
    describe('POST /settings', () => {
        it('should create a setting with valid JSON object', async () => {
            const res = await request(app)
                .post('/settings')
                .send({ name: 'theme', value: { color: 'dark' } });

            expect(res.status).toBe(200);
            expect(res.body.value).toEqual({ color: 'dark' });
        });

        it('should allow empty JSON object', async () => {
            const res = await request(app)
                .post('/settings')
                .send({ name: 'empty', value: {} });

            expect(res.status).toBe(200);
            expect(res.body.value).toEqual({});
        });

        it('should reject primitive values', async () => {
            const res = await request(app)
                .post('/settings')
                .send({ name: 'invalid', value: 123 });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Value must be a JSON object');
        });
    });

    describe('GET /settings', () => {
        it('should handle pagination with default limit', async () => {
            await Setting.create({ name: 's1', value: {} });
            const res = await request(app).get('/settings');
            expect(res.status).toBe(200);
            expect(res.body.meta.limit).toBe(20);
        });

        it('should correct negative limit to 20', async () => {
            const res = await request(app).get('/settings?limit=-1');
            expect(res.status).toBe(200);
            expect(res.body.meta.limit).toBe(20);
        });
    });

    describe('DELETE /settings/:id', () => {
        it('should be idempotent', async () => {
            const setting = await Setting.create({ name: 'delete-me', value: {} });
            const id = setting._id;

            // First delete
            const res1 = await request(app).delete(`/settings/${id}`);
            expect(res1.status).toBe(200);

            // Second delete (same ID)
            const res2 = await request(app).delete(`/settings/${id}`);
            expect(res2.status).toBe(200);
        });

        it('should return 200 for invalid ID', async () => {
            const res = await request(app).delete('/settings/invalid-id');
            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Item does not exist');
        });
    });
});
