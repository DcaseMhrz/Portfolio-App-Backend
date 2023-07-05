import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Portfolio from 'App/Models/Portfolio'

export default class PortfolioPolicy extends BasePolicy {
	public async viewList(user: User) {
		return true
	}
	public async view(user: User, portfolio: Portfolio) {
		return true
	}
	public async create(user: User) {
		return true
	}
	public async update(user: User, portfolio: Portfolio) {
		return true
	}
	public async delete(user: User, portfolio: Portfolio) {
		return true
	}
}
