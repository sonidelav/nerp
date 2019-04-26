import {Repository} from 'typeorm';

export abstract class EntityService<T> {

    constructor( protected repository: Repository<T> ) {}

    /**
     * Find All
     */
    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    /**
     * Find One By Id
     * @param id
     */
    async findOneById(id: number|string): Promise<T> {
        return await this.repository.findOne(id);
    }

    /**
     * Update
     * @param id
     * @param data
     */
    async update(id: number|string, data: T): Promise<T> {
        const model = await this.repository.findOne(id);
        if (model) {
            this.repository.merge(model, data);
            return await this.repository.save(model);
        }
        return null;
    }

    /**
     * Delete
     * @param id
     */
    async delete(id: number|string): Promise<T> {
        const model = await this.repository.findOneOrFail(id);
        if (model) {
            return await this.repository.remove(model);
        }
        return null;
    }

    /**
     * Create
     * @param data
     */
    async create(data: T): Promise<T> {
        return await this.repository.save(data);
    }
}
