import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import axios from 'axios';
import { Subscription } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { event, callbackUrl } = createSubscriptionDto;
    const events = [
      'project.created',
      'project.updated',
      'project.deleted',
      'project.projectManagerAssigned',
      'project.end',//
      'project.endSummary',//
      'task.created',
      'task.updated',
      'task.deleted',
      'task.completed',
      'task.rejected',
      'task.started',
      'task.not started',
    ]; //fill this
    //check if event is in array
    if (events.includes(event)) {
      //create subscriptions
      // ..........
      await this.subscriptionRepository.save(createSubscriptionDto);
      console.log(`New webhook subscriber: ${callbackUrl}`);
      return { message: 'Subscription successful!' };
    } else {
      return { message: 'Invalid event type' };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }

  @OnEvent('event')
  async triggerWebhooks(body) {
    const {event, data}=body;
    //first get subscriptions
    // .........
    const subscriptions = await this.subscriptionRepository.find({where:{event}}); //more then one can subscribe to same event
    subscriptions.forEach((sub) => {
      axios
        .post(sub.callbackUrl, { event: sub.event, data })
        .then((response) => {
          console.log(`Webhook sent to ${sub.callbackUrl}, response: ${response.status}`);
        })
        .catch((err) => {
          console.error(`Failed to send webhook to ${sub.callbackUrl}: ${err.message}`);
        });
    });
  }
}
