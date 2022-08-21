import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import {CurrencyState, CurrencyType} from 'redux/currencyReducer';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    ChangeCurrentCurrencyAC
} from 'redux/actions';
import {useDispatch, useSelector} from "react-redux";
import {IGlobalState} from "redux/state";

export const CurrencyEContainer = () => {
    const currencyState = useSelector<IGlobalState, CurrencyState>(state => state.currency)
    const dispatch = useDispatch()

    let currencyRate: number = 0;
    const currenciesName = currencyState.currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currencyState.currentCurrency) {
            currencyRate = currencyState.isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value))
                } else {
                    dispatch(ChangeCurrencyFieldAC(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2)))
                }
            } else {
                if (value === '') {
                    dispatch(ChangeCurrencyFieldAC(value, value))
                } else {
                    dispatch(ChangeCurrencyFieldAC((+Number(value).toFixed(2) * currencyRate).toFixed(2), value))
                }
            }
        }
    };

    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy'
            ? dispatch(ChangeActionAC(true))
            : dispatch(ChangeActionAC(false))
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && dispatch(ChangeCurrentCurrencyAC(e.currentTarget.dataset.currency));
    };

    return (
        <>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currencyState.currentCurrency}
                currencyRate={currencyRate}
                isBuying={currencyState.isBuying}
                amountOfBYN={currencyState.amountOfBYN}
                amountOfCurrency={currencyState.amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </>
    )
}

