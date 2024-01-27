require "test_helper"

class ProfilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @profile = profiles(:one)
  end

  test "should get index" do
    get profiles_url, as: :json
    assert_response :success
  end

  test "should create profile" do
    assert_difference('Profile.count') do
      post profiles_url, params: { profile: { date_of_birth: @profile.date_of_birth, first_name: @profile.first_name, last_name: @profile.last_name, phone_number: @profile.phone_number, second_last_name: @profile.second_last_name, second_name: @profile.second_name, strava_url: @profile.strava_url, user_id: @profile.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show profile" do
    get profile_url(@profile), as: :json
    assert_response :success
  end

  test "should update profile" do
    patch profile_url(@profile), params: { profile: { date_of_birth: @profile.date_of_birth, first_name: @profile.first_name, last_name: @profile.last_name, phone_number: @profile.phone_number, second_last_name: @profile.second_last_name, second_name: @profile.second_name, strava_url: @profile.strava_url, user_id: @profile.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy profile" do
    assert_difference('Profile.count', -1) do
      delete profile_url(@profile), as: :json
    end

    assert_response 204
  end
end
