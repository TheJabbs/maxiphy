import {Global, Module} from "@nestjs/common";
import {ErrorLoggingService} from "./ErrorLogging.service";

@Global()
@Module({
    providers: [ErrorLoggingService],
    exports: [ErrorLoggingService]
})
export class ErrorLoggingModule {}