import { createElement } from '../render.js';
import { getRandomPoint } from '../mock/point.js';
import { TYPES, FORMATS } from '../consts.js';
import { humanizeDate } from '../utils.js';
import { offerArray } from '../mock/offer.js';
import { destinations } from '../mock/destination.js';


function createPointEditTemplate(point) {
  const { basePrice, dateFrom, dateTo, destination, offers, type } = point;

  const typeList = TYPES.map((eventType) =>
    `<div class="event__type-item">
      <input id="event-type-${eventType.toLowerCase()}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${eventType.toLowerCase()}" ${eventType.toLowerCase() === type ? 'checked' : ''}>
      <label class="event__type-label event__type-label--${eventType.toLowerCase()}" for="event-type-${eventType.toLowerCase()}-1">${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</label>
    </div>`).join('\n');

  const filteredOffers = offerArray.find((o) => o.type === type);
  const offerList = filteredOffers.offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.title.toLowerCase().replace(' ', '-')}-1" type="checkbox" name="event-offer-${offer.title.toLowerCase().replace(' ', '-')}" ${offers.includes(offer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase().replace(' ', '-')}-1">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
</div>`).join('\n');

  return (
    `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${typeList}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinations.find((d) => d.id === destination[0]).name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, FORMATS.fullDate)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, FORMATS.fullDate)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offerList}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destinations.find((d) => d.id === destination[0]).description}</p>
                  </section>
                </section>
              </form>
            </li>`
  );
}


export default class PointEditView {
  constructor(point = getRandomPoint()) {
    this.point = point;
    this.element = null;
  }


  getTemplate() {
    return createPointEditTemplate(this.point);
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}
