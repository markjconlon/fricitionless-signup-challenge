Rails.application.routes.draw do
  resources :users, only: [:new]
  get '/users/check_email/' => 'users#check_email'
end
