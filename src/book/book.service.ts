import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async getBooks(): Promise<Book[]> {
        return await this.bookModel.find()
    }

    async createBook(book: Book): Promise<Book> {
        const res = await this.bookModel.create(book);
        return res;
    }

    async findBookById(id: string) :Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId) {
            throw new BadRequestException('Please enter corrent id.')
        }
        
        const book =  await this.bookModel.findById(id);
        if(!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    async updateBookById(id: string, book: Book): Promise<Book> {
        return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true,
        }) 
    }

    async deleteBookById(id: string): Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id)
    }
}
