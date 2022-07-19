import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import CURRENCYCHECK_FIELD from '@salesforce/schema/Contact.currency_changed__c';
import ID_FIELD from '@salesforce/schema/Contact.Id';

export default class ShowToastComp extends LightningElement {

    @api recordId;
    @api toastTitle = 'Currency Changed';
    @api toastMessage = 'Please remember to adjust the commercial values when changing currencies. No automatic currency conversion applied.';
    @api toastVariant = 'warning';

    renderedCallback() {
        const toastEvent = new ShowToastEvent({
            title: this.toastTitle,
            message: this.toastMessage,
            variant: this.toastVariant,
            mode: 'sticky'
        });
        this.dispatchEvent(toastEvent);

        const fields = {};
        fields[CURRENCYCHECK_FIELD.fieldApiName] = false;
        fields[ID_FIELD.fieldApiName] = this.recordId;
        const recordInput = { fields };

        updateRecord(recordInput)
            .then(() => {
                // return refreshApex(this.contact);
                // return getRecordNotifyChange([{recordId: this.recordId}]); 
                console.log('returned');
            })
            .catch(error => {
               console.log(error);
            });
    }
}