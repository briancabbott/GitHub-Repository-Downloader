/*
Copyright (c) 2021 VMware, Inc.
SPDX-License-Identifier: MIT

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

use std::iter::FromIterator;

use ddlog_rt::Val;
use types__uuid::crate_uuid;

pub fn map_extract_val_uuids<K: Val>(
    ids: &ddlog_std::Map<K, uuid_or_string_t>,
) -> ddlog_std::Map<K, uuid> {
    ddlog_std::Map::from_iter(ids.x.iter().map(|(k, v)| (k.clone(), extract_uuid(v))))
}
pub fn set_extract_uuids(ids: &ddlog_std::Set<uuid_or_string_t>) -> ddlog_std::Set<uuid> {
    ddlog_std::Set::from_iter(ids.x.iter().map(|x| extract_uuid(x)))
}

pub fn group2vec_remove_sentinel<K>(
    g: &ddlog_std::Group<K, uuid_or_string_t>,
) -> ddlog_std::Vec<uuid_or_string_t> {
    let mut res = ddlog_std::Vec::new();
    for ddlog_std::tuple2(ref v, _) in g.iter() {
        match v {
            ddlog_std::Either::Right { r } => {
                if r.as_str() != "" {
                    res.push(ddlog_std::Either::Right { r: r.clone() });
                };
            }
            v => {
                res.push(v.clone());
            }
        }
    }
    res
}

pub fn group2set_remove_sentinel<K>(
    g: &ddlog_std::Group<K, uuid_or_string_t>,
) -> ddlog_std::Set<uuid_or_string_t> {
    let mut res = ddlog_std::Set::new();
    for ddlog_std::tuple2(ref v, _) in g.iter() {
        match v {
            ddlog_std::Either::Right { r } => {
                if r.as_str() != "" {
                    res.insert(ddlog_std::Either::Right { r: r.clone() });
                };
            }
            v => {
                res.insert(v.clone());
            }
        }
    }
    res
}

pub fn group2map_remove_sentinel<K1, K2: Ord + Clone>(
    g: &ddlog_std::Group<K1, (K2, uuid_or_string_t)>,
) -> ddlog_std::Map<K2, uuid_or_string_t> {
    let mut res = ddlog_std::Map::new();
    for ddlog_std::tuple2((ref k, ref v), _) in g.iter() {
        match v {
            ddlog_std::Either::Right { r } => {
                if r.as_str() != "" {
                    res.insert((*k).clone(), ddlog_std::Either::Right { r: r.clone() });
                };
            }
            _ => {
                res.insert((*k).clone(), v.clone());
            }
        }
    }
    res
}

pub fn uuid2str(i: &u128) -> String {
    crate_uuid::Uuid::from_u128(*i /*.to_be()*/)
        .to_hyphenated()
        .to_string()
}

pub fn uuid2name(i: &u128) -> String {
    let s = crate_uuid::Uuid::from_u128(*i /*.to_be()*/)
        .to_simple()
        .to_string();
    format!(
        "u{}_{}_{}_{}_{}",
        &s[0..8],
        &s[8..12],
        &s[12..16],
        &s[16..20],
        &s[20..32]
    )
}

pub fn set_map_uuid2str(ids: &ddlog_std::Set<uuid>) -> ddlog_std::Set<String> {
    ddlog_std::Set::from_iter(ids.x.iter().map(|id| uuid2str(id)))
}

pub fn set_map_uuid2name(ids: &ddlog_std::Set<uuid>) -> ddlog_std::Set<String> {
    ddlog_std::Set::from_iter(ids.x.iter().map(|id| uuid2name(id)))
}
