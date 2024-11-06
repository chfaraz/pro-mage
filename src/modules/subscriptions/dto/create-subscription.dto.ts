import { IsString, IsNotEmpty } from "class-validator";

export class CreateSubscriptionDto {
    @IsString()
    @IsNotEmpty()
    callbackUrl:string;
    
    @IsString()
    @IsNotEmpty()
    event:string;
}
