Rails.application.routes.draw do
  resources :working_days
  resources :training_weeks
  get 'training_plans/active', to: 'training_plans#active'
  resources :training_plans do
    collection do
      get 'active', to: 'training_plans#active'
    end
  end
  get 'private/test'
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }
end
