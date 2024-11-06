import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import axios from 'axios';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private taskRepository: Repository<Subscription>,
  ) {}

  create(createSubscriptionDto: CreateSubscriptionDto) {
    const { event, callbackUrl } = createSubscriptionDto;
    const events =[]//fill this
    //check if event is in array
    if (events.includes(event)) {
      //create subscriptions
      // ..........
      console.log(`New webhook subscriber: ${callbackUrl}`);
      return { message: 'Subscription successful!' };
    } else {
      return { message: 'Invalid event type' };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }

  triggerWebhooks(data) {
    //first get subscriptions
    // .........
    // subscriptions.forEach((sub) => {
    //   axios
    //     .post(sub.callbackUrl, { event: sub.event, data })
    //     .then((response) => {
    //       console.log(`Webhook sent to ${sub.callbackUrl}, response: ${response.status}`);
    //     })
    //     .catch((err) => {
    //       console.error(`Failed to send webhook to ${sub.callbackUrl}: ${err.message}`);
    //     });
    // });
  }
}
