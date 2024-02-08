import { observable } from '@legendapp/state';
import { configureObservablePersistence, persistObservable } from '@legendapp/state/persist';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';

// Global configuration
configureObservablePersistence({
    pluginLocal: ObservablePersistLocalStorage
});

export const state$ = observable({
    user: {
        birthday: null,
        country: '',
        displayName: null,
        email: null,
        equipments: [],
        games: [],
        memberSince: null,
        photoURL: '',
        platforms: [],
        uid: null
    },
    settings: {
        theme: 'light',
    },
});

export const tempState$ = observable({
    userChanges: {},
    searchString: '',
    usersFound: [],
    leaguesFound: [],
    publicUserProfile: {}
})

persistObservable(state$, {
    local: 'userData',
    pluginLocal: ObservablePersistLocalStorage,
  })
