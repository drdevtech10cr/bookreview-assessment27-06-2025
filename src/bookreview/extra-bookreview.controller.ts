import { Controller, Get, Param } from "@nestjs/common";
import { BookReviewService } from "./bookreview.service";
import { ResponseService } from "src/helping-services/repsonsive.service";

@Controller('books-reviews')
export class ExtraBookReviewController {
    constructor(
        private readonly bookReviewService: BookReviewService,
    ) { }

    /** review fetched bhy id */
    @Get(':id')
    async GetReviewByID(@Param('id') id: number) {
        try {
            const fetchreview = await this.bookReviewService.fetchReviewByID(id);
            return ResponseService('review fetched successfully', 200, fetchreview)
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }

    @Get()
    async GetReviews() {
        try {
            const fetchreviews = await this.bookReviewService.fetchReviewsAll();
            return ResponseService('review fetched successfully', 200, fetchreviews)
        } catch (error) {
            return ResponseService(error.message, 400, null)
        }
    }
}