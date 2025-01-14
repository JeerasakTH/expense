import {
    Model,
    Op,
    fn,
    col,
    WhereOptions,
    FindOptions,
} from "sequelize";

type Filter = Record<string, any>;

interface PaginationOptions {
    limit?: number;
    pageOffset?: number;
}

interface OrderOption {
    order?: Array<[string, string]>;
}

export const GetPageByQuery = async <T extends Model>(
    Model: { new(): T; findAll: Function },
    filter: Filter,
    order: OrderOption["order"] = [],
    limit = 10,
    pageOffset = 0,
    constraint?: WhereOptions,
    raw = true
): Promise<T[]> => {
    try {
        let filterLike = { ...filter };

        for (const key in filterLike) {
            if (filterLike[key] instanceof Date) {
                filterLike[key] = {
                    [Op.eq]: filterLike[key],
                };
            } else {
                filterLike[key] = {
                    [Op.like]: `%${filterLike[key]}%`,
                };
            }
        }

        if (constraint) {
            filterLike = { ...filterLike, ...constraint };
        }

        const result = await Model.findAll({
            where: filterLike,
            limit,
            order: order.length > 0 ? order : [["createdAt", "DESC"]],
            offset: pageOffset,
            raw,
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetCountPageByQuery = async <T extends Model>(
    Model: { new(): T; count: Function },
    filter: Filter,
    limit = 10,
    constraint?: WhereOptions
): Promise<number> => {
    try {
        let filterLike = { ...filter };

        for (const key in filterLike) {
            filterLike[key] = {
                [Op.like]: `%${filterLike[key]}%`,
            };
        }

        if (constraint) {
            filterLike = { ...filterLike, ...constraint };
        }

        const total = await Model.count({
            where: filterLike,
            raw: true,
        });
        return Math.ceil(total / limit) || 1;
    } catch (error) {
        throw error;
    }
};

export const GetOne = async <T extends Model>(
    Model: { new(): T; findOne: Function },
    filter: WhereOptions,
    filterOption?: FindOptions
): Promise<T | null> => {
    try {
        const result = await Model.findOne({
            where: filter,
            ...filterOption,
            raw: true,
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetMany = async <T extends Model>(
    Model: { new(): T; findAll: Function },
    filter: Filter,
    order: OrderOption["order"] = [],
    raw = true
): Promise<T[]> => {
    try {
        const result = await Model.findAll({
            where: filter,
            order: order.length > 0 ? order : [["createdAt", "DESC"]],
            raw,
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const CreateOne = async <T extends Model>(
    Model: { new(): T; create: Function },
    payload: Partial<T>
): Promise<T> => {
    try {
        const result = await Model.create(payload);
        return result;
    } catch (error) {
        throw error;
    }
};

export const UpdateOne = async <T extends Model>(
    Model: { new(): T; findOne: Function; update: Function },
    payload: Partial<T>,
    filter: WhereOptions
): Promise<number[]> => {
    try {
        const resultOne = await Model.findOne({
            where: filter,
            raw: true,
        });

        if (!resultOne) {
            console.log("ไม่พบรายการที่ต้องการอัพเดต");
            throw new Error("ไม่พบรายการที่ต้องการอัพเดต");
        }

        const result = await Model.update(payload, { where: resultOne });
        return result;
    } catch (error) {
        throw error;
    }
};

export const DeleteOne = async <T extends Model>(
    Model: { new(): T; findOne: Function; destroy: Function },
    filter: WhereOptions
): Promise<number> => {
    try {
        const resultOne = await Model.findOne({
            where: filter,
            raw: true,
        });

        if (!resultOne) {
            throw new Error("ไม่พบรายการที่ต้องการลบ");
        }

        const result = await Model.destroy({ where: resultOne });
        return result;
    } catch (error) {
        throw error;
    }
};

export const GetCount = async <T extends Model>(
    Model: { new(): T; count: Function },
    filter: WhereOptions
): Promise<number> => {
    try {
        const count = await Model.count({
            where: filter,
            raw: true,
        });
        return count;
    } catch (error) {
        throw error;
    }
};
