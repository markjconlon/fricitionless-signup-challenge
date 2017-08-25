class UsersController < ApplicationController
  def new
  end

  def check_email
    enterred_email = (params[:q])
    @result = Clearbit::Enrichment.find(email: enterred_email, stream: true)
    if request.xhr?
      render :json =>
      {person: {fullName: "#{@result.person.name.fullName}",
                companyName: "#{@result.person.employment.name}",
                phone: "#{@result.company ? @result.company.phone : ""}",
                employees: "#{@result.company ? @result.company.employees : ""}"
      }}
    end
  end
end
