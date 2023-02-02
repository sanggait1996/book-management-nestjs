import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getBooks(): Promise<Book[]> {
        return this.bookService.getBooks()
    }

    @Post()
    async createBook(
        @Body()
        book: CreateBookDto
    ): Promise<Book> {
        return this.bookService.createBook(book)
    }

    @Get(':id')
    async findBookById(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.findBookById(id);
    }

    @Put(':id')
    async updateBookById(
        @Param('id')
        id: string, 
        @Body()
        book: UpdateBookDto
    ): Promise<Book> {
        return this.bookService.updateBookById(id, book)
    }

    @Delete(':id')
    async deleteBookById(
        @Param('id')
        id: string
    ): Promise<string> {
        const deleted = this.bookService.deleteBookById(id)
        if(deleted) {
            return `Delete book with ${id} scuccessful.`
        }

    }
}
