import requests
import pprint


def http_get(url, **args):
    response = requests.get(url, **args)
    response.raise_for_status()
    return response


def http_post(url, **args):
    response = requests.post(url, **args)
    response.raise_for_status()
    return response


def get_all_items(relative_url, headers, pagination_limit=5):
    url = f"https://circleci.com/api/v2{relative_url}"
    temp_url = str(url)
    pages_iterated = 0
    while True:
        res = http_get(temp_url, headers=headers).json()
        if (res.get("message") == 'An internal server error occurred.'):
            print("Circle side error hit")
            break
        try:
            # delegates iteration to the (list), so returns 1 by one...
            yield from res["items"]
        except KeyError as e:
            print(e)
            pprint.pprint(res)
            print(url)
            raise e

        page_token = res.get("next_page_token")

        if page_token is not None:
            temp_url = f"{url}?page-token={page_token}"
            pages_iterated += 1
        else:
            break

        if (pagination_limit and (pages_iterated >= pagination_limit)):
            print("page limit hit")
            break
